import { permanentRedirect } from "next/navigation";

export default function LegacyMasterBowyerProductPage() {
  permanentRedirect("/about/partners#commission");
}
