import { useEffect, useRef, useState } from 'react';
import { MapPin, Search, AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import { toast } from 'sonner';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LocationPickerProps {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
  initialAddress?: string;
}

export default function LocationPicker({ onLocationSelect, initialAddress = '' }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [address, setAddress] = useState(initialAddress);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Initialize map
  useEffect(() => {
    if (!showMap || !mapRef.current || mapInstanceRef.current) return;

    const defaultLocation: [number, number] = [24.7136, 46.6753]; // Riyadh

    // Create map
    const map = L.map(mapRef.current).setView(defaultLocation, 15);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add marker
    const marker = L.marker(defaultLocation, {
      draggable: true,
      title: 'حدد موقعك',
    }).addTo(map);

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Handle map click
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      updateMarkerPosition(lat, lng);
    });

    // Handle marker drag
    marker.on('dragend', () => {
      const position = marker.getLatLng();
      updateMarkerPosition(position.lat, position.lng);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [showMap]);

  const updateMarkerPosition = async (lat: number, lng: number) => {
    if (!markerRef.current) return;

    setIsLoading(true);
    markerRef.current.setLatLng([lat, lng]);
    mapInstanceRef.current?.setView([lat, lng], 15);
    setSelectedCoords({ lat, lng });

    try {
      // Use Nominatim (OpenStreetMap) for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'ar',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formattedAddress = data.address?.road || data.address?.city || data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        setAddress(formattedAddress);
        onLocationSelect(formattedAddress, lat, lng);

        toast.success('تم تحديث الموقع بنجاح! ✓', {
          duration: 2000,
          icon: <CheckCircle2 size={18} className="text-green-500" />,
        });
      }
    } catch (error) {
      console.error('Error getting address:', error);
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      onLocationSelect(`${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 3) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=sa&limit=5`,
          {
            headers: {
              'Accept-Language': 'ar',
            },
          }
        );

        if (response.ok) {
          const results = await response.json();
          if (results.length > 0) {
            const firstResult = results[0];
            const lat = parseFloat(firstResult.lat);
            const lng = parseFloat(firstResult.lon);
            updateMarkerPosition(lat, lng);
          }
        }
      } catch (error) {
        console.error('Error searching location:', error);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Input */}
      <div className="relative">
        <label className="block text-sm font-semibold text-foreground mb-2">
          🔍 ابحث عن عنوانك أو حدده من الخريطة
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-primary pointer-events-none" size={18} />
          <input
            type="text"
            value={address}
            onChange={handleSearchChange}
            onFocus={() => setShowMap(true)}
            placeholder="ابدأ بكتابة عنوانك (مثال: حي الرياض، الرياض)..."
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          />
          {selectedCoords && (
            <CheckCircle2 className="absolute right-4 top-3.5 text-green-500" size={18} />
          )}
        </div>
      </div>

      {/* Toggle Map Button */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="w-full px-4 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
      >
        {showMap ? '🗺️ إخفاء الخريطة' : '🗺️ عرض الخريطة'}
      </button>

      {/* Map Container */}
      {showMap && (
        <div className="relative space-y-3 animate-fade-in">
          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg border-2 border-primary overflow-hidden shadow-lg bg-gray-100"
            style={{ minHeight: '400px' }}
          />

          {/* Selected Location Info */}
          <div className="p-4 bg-secondary rounded-lg border border-border">
            <div className="flex items-start gap-3">
              {selectedCoords ? (
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">📍 العنوان المختار:</p>
                <p className="text-sm text-foreground">
                  {address || 'اضغط على الخريطة أو ابحث عن عنوان'}
                </p>
                {selectedCoords && (
                  <p className="text-xs text-muted-foreground mt-2">
                    الإحداثيات: {selectedCoords.lat.toFixed(4)}, {selectedCoords.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-sm text-foreground space-y-1">
            <p className="font-semibold">💡 نصائح مفيدة:</p>
            <ul className="text-xs space-y-1 ms-4">
              <li>• يمكنك البحث عن عنوانك أو الضغط على الخريطة لتحديد الموقع</li>
              <li>• اسحب المؤشر الأحمر لتعديل الموقع بدقة</li>
              <li>• استخدم أزرار التكبير والتصغير للتنقل بسهولة</li>
            </ul>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-700 flex items-center gap-2">
          <Loader size={16} className="animate-spin" />
          جاري تحديث الموقع...
        </div>
      )}
    </div>
  );
}
