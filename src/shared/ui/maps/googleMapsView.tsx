import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";

interface GoogleMapsProps {
    lat: number;
    lng: number;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ lat, lng }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('themeGoogle', newTheme);
        setIsDarkMode(!isDarkMode);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY || ''
    });
    
    const containerStyle = {
        width: '350px',
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

    const [, setMap] = useState(null);

    const onLoad = useCallback(function callback(map: any) {
        setMap(map);
        map.setZoom(17);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div style={{ position: 'relative' }}>
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
            <button 
                onClick={toggleTheme} 
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '10px',
                    backgroundColor: isDarkMode ? '#333' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            </button>
        </div>
    ) : <></>
}

export { GoogleMaps };
