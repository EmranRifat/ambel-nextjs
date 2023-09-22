import { useEffect, useRef, useState } from "react";
import {
	BiPause,
	BiPauseCircle,
	BiPlay,
	BiPlayCircle,
	BiStop,
	BiStopCircle,
} from "react-icons/bi";
const audioType = "audio/*";

import dynamic from "next/dynamic";

const Waveform = dynamic(() => import("react-audio-waveform"), { ssr: false });

const VoiceRecordComponent = ({ setRecordedBlob }) => {
	// const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
	const [miliseconds, setMiliseconds] = useState(0);
	const [timer, setTimer] = useState(null);
	const [pauseRecord, setPauseRecord] = useState(false);
	const [position, setPosition] = useState(0);
	const [waveLength, setWaveLength] = useState(0);
	const waveRef = useRef(null);
	const [audioChunks, setAudioChunks] = useState([]);
	const [recorder, setRecorder] = useState(null);
	const [recoredComplete, setRecoredComplete] = useState(false);
	const [playingAudio, setPlayingAudio] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPaused, setIspaused] = useState(true);

	useEffect(() => {
		if (waveRef.current) {
			setWaveLength(waveRef.current.offsetWidth);
		}
	}, [waveRef]);

	useEffect(() => {
		initRecorder().then((val) => {
			startTimer();
		});
		return () => {
			clearInterval(timer);
			if (recorder) recorder.stop();
			if (playingAudio) playingAudio.pause();
		};
	}, []);

	const initRecorder = async () => {
		try {
			// Get the user's microphone
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			// Create a new MediaRecorder with the correct MIME type
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: "audio/webm; codecs=opus",
			});
			setRecorder(mediaRecorder);
			// Listen for the dataavailable event
			mediaRecorder.ondataavailable = (event) => {
				// Push the data to the chunks array
				setAudioChunks((prevChunks) => [...prevChunks, event.data]);
			};
			mediaRecorder.onstop = (event) => {
				stream.getTracks().forEach((track) => track.stop());
			};
			// Start recording
			mediaRecorder.start();
			// Create an AudioContext
		} catch (err) {
			console.error(err);
		}
	};

	const startTimer = () => {
		setTimer(setInterval(countDown, 100));
	};

	const countDown = () => {
		setMiliseconds((miliseconds) => miliseconds + 100);
		// setTime(milisecondsToTime(seconds));
		// props.handleCountDown(time);
	};

	const milisecondsToTime = (milisecs) => {
		let secs = milisecs / 1000;
		let hours = Math.floor(secs / (60 * 60));

		let divisor_for_minutes = secs % (60 * 60);
		let minutes = Math.floor(divisor_for_minutes / 60);

		let divisor_for_seconds = divisor_for_minutes % 60;
		let seconds = Math.ceil(divisor_for_seconds);

		let obj = {
			h: hours,
			m: minutes,
			s: seconds,
		};
		return obj;
	};

	const handleAudioPause = (e) => {
		e.preventDefault();
		clearInterval(timer);
		if (recorder) recorder.pause();
		setPauseRecord(true);
	};

	const handleAudioStart = (e) => {
		e.preventDefault();
		startTimer();
		if (recorder) recorder.resume();
		setPauseRecord(false);
	};

	const handleAudioStop = (e) => {
		e.preventDefault();
		clearInterval(timer);
		if (recorder) recorder.stop();
		setRecoredComplete(true);
	};

	const TEST_PEAKS = Array.from({ length: waveLength }, () => Math.random());

	const handleClick = (secs) => {
		setPosition(secs);
	};

	const playAudio = () => {
		// convert saved chunks to blob
		if (audioChunks.length > 0) {
			// Create a new Blob with the recorded data
			const audioBlob = new Blob(audioChunks, {
				type: "audio/webm; codecs=opus",
			});
			setRecordedBlob(audioBlob);
			const audioURL = window.URL.createObjectURL(audioBlob);
			const audio = new Audio(audioURL);
			setPlayingAudio(audio);
			audio.play();
			setIsPlaying(true);
			setIspaused(false);
			audio.onended = () => {
				setIspaused(true);
			};
			audio.onpause = () => {
				setIspaused(true);
			};

			audio.ontimeupdate = function () {
				setMiliseconds(audio.currentTime * 1000);
				setPosition(audio.currentTime);
			};
		}
	};

	const pausePlayingAudio = () => {
		if (!playingAudio?.ended && !playingAudio?.paused) {
			playingAudio.pause();
			clearInterval(timer);
		} else {
			playingAudio.play();
			startTimer();
			setIspaused(false);
		}
	};
	return (
		<div className="w-full flex gap-2 items-center transition">
			<div className="text-xl">
				{recoredComplete ? (
					<div
						onClick={() => {
							if (!isPlaying) {
								playAudio();
							} else {
								pausePlayingAudio();
							}
						}}
						className="flex gap-2"
					>
						{isPaused ? <BiPlay /> : <BiPause />}
					</div>
				) : (
					<div className="flex gap-2">
						{pauseRecord ? (
							<BiPlayCircle onClick={handleAudioStart} />
						) : (
							<BiPauseCircle onClick={handleAudioPause} />
						)}
						<BiStopCircle color="red" onClick={handleAudioStop} />
					</div>
				)}
			</div>
			<div className="text-sm">
				{milisecondsToTime(miliseconds).m < 10
					? "0" + milisecondsToTime(miliseconds).m
					: milisecondsToTime(miliseconds).m}
				:
				{milisecondsToTime(miliseconds).s < 10
					? "0" + milisecondsToTime(miliseconds).s
					: milisecondsToTime(miliseconds).s}
			</div>
			<div ref={waveRef} className="w-full">
				<Waveform
					barWidth={1}
					peaks={TEST_PEAKS}
					height={20}
					pos={position}
					duration={waveLength}
					onClick={handleClick}
					color="black"
					progressColor="#000000"
					transitionDuration={waveLength}
					progressGradientColors={[
						[0, "#888"],
						[1, "#aaa"],
					]}
				/>
			</div>
		</div>
	);
};

export default VoiceRecordComponent;
