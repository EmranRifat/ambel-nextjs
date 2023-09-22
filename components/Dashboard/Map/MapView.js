import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function MapView(props) {
	const [pinPosition, setPinLocation] = React.useState({
		lat: props.mapCoordinate?.lattitude ?? 23.8103,
		lng: props.mapCoordinate?.longitude ?? 90.4125,
	});
	const [center, setPinLocationCenter] = React.useState({
		lat: props.mapCoordinate?.lattitude ?? 23.8103,
		lng: props.mapCoordinate?.longitude ?? 90.4125,
	});

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyCZy9cFlkUUv5DG4iJT_EaRd5q_PkDR_eg",
	});

	return (
		<>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={{
						width: props.width ?? "100%",
						height: props.height ?? "200px",
					}}
					center={center}
					zoom={props.zoom ?? 10}
					options={{
						disableDefaultUI: true,
						fullscreenControl: true,
						controlSize: props.controlSize ?? 20,
					}}
					onClick={
						props.canSelectLocation
							? (mapEvent) => {
									setPinLocation({
										lat: mapEvent.latLng.lat(),
										lng: mapEvent.latLng.lng(),
									});
									props.setInfo({
										...props.info,
										mapCoordinate: {
											lattitude: mapEvent.latLng.lat(),
											longitude: mapEvent.latLng.lng(),
										},
									});
							  }
							: () => {}
					}
				>
					<Marker position={pinPosition} />
				</GoogleMap>
			)}
		</>
	);
}

export default React.memo(MapView);
