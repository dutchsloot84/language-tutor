import { GeneratedDrillPracticeClient } from "./practice-client";

export default async function GeneratedDrillPracticePage({ params }: { params: Promise<{ drillId: string }> }) {
  const { drillId } = await params;
  return <GeneratedDrillPracticeClient drillId={drillId} />;
}
