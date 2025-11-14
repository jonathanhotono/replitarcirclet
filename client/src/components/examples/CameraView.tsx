import CameraView from "../CameraView";

export default function CameraViewExample() {
  return (
    <CameraView showCamera={true}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center bg-black/50 p-6 rounded-lg">
          <p>Camera feed with overlay content</p>
        </div>
      </div>
    </CameraView>
  );
}
