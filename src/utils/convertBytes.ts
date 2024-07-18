export default function convertBytes(bytes: number) {
  if (bytes <= 10240) {
    const kilobytes = bytes / 1024;
    return `${kilobytes.toFixed(2)} KB`;
  } else {
    const megabytes = bytes / 1024 / 1024;
    return `${megabytes.toFixed(2)} MB`;
  }
}
