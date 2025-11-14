import ObjectIndicator from "../ObjectIndicator";

export default function ObjectIndicatorExample() {
  return (
    <div className="min-h-screen bg-background p-8">
      <ObjectIndicator
        objectName="Waste Bin"
        icon="🗑️"
        accentColor="hsl(142, 70%, 45%)"
      />
      <div className="text-center mt-32 text-muted-foreground">
        <p>Object indicator appears at the top</p>
      </div>
    </div>
  );
}
