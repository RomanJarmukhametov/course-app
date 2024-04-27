/**
 * Formats the duration in minutes into a string representation of hours and minutes.
 * @param duration - The duration in minutes.
 * @returns A string representation of the duration in the format "HH:MM hours".
 */
const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const hoursPadded = hours < 10 ? `0${hours}` : hours.toString();
  const minutesPadded = minutes < 10 ? `0${minutes}` : minutes.toString();
  const suffix = hours === 1 ? "hour" : "hours"; // Check if exactly 1 hour for singular
  return `${hoursPadded}:${minutesPadded} ${suffix}`;
};

export default formatDuration;
