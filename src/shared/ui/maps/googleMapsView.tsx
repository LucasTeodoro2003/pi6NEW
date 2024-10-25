import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

interface GoogleMapsProps {
    lat: number;
    lng: number;
    isDarkMode: boolean;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ lat, lng, isDarkMode }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY || ''
    });

    const containerStyle = {
        width: '250px',
        height: '250px'
    };

    const darkModeStyles = [
        { elementType: 'geometry', stylers: [{ color: '#212121' }] },
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
        { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
        { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#383838' }] },
        { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212121' }] },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
        { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] },
    ];

    const mapOptions = {
        styles: isDarkMode ? darkModeStyles : undefined,
        disableDefaultUI: true,
    };

    const [, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map: any) {
        setMap(map);
        map.setZoom(17);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
        >
            <Marker position={{ lat, lng }} />
        </GoogleMap>
    ) : <></>
}

export { GoogleMaps };
