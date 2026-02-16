import { labs } from "@/data/labs";
import { LabDetailClient } from "./LabDetailClient";

export function generateStaticParams() {
  return labs.map((lab) => ({
    labId: lab.id,
  }));
}

interface LabDetailPageProps {
  params: Promise<{ labId: string }>;
}

export default async function LabDetailPage({ params }: LabDetailPageProps) {
  const { labId } = await params;
  return <LabDetailClient labId={labId} />;
}

