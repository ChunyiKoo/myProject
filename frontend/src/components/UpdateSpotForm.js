import SpotsForm from "./SpotsForm";
import { useParams } from "react-router-dom";

const UpdateSpotForm = () => {
  const params = useParams();
  const { spotId } = params;
  return <SpotsForm formType="UpdateSpotForm" spotId={spotId} />;
};
export default UpdateSpotForm;
