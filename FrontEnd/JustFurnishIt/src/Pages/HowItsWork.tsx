import Footer from "../Components/Common/Footer";
import FiveSteps from "../Components/Common/HowItWorks/FiveSteps";
import StepDetails from "../Components/Common/HowItWorks/StepDetails";

function HowItsWork() {
  return (
    <div>
      <FiveSteps />
      <div className="w-7/12 mx-auto">
        <StepDetails stepId={1} />
        <StepDetails stepId={2} />
        <StepDetails stepId={3} />
        <StepDetails stepId={4} />
        <StepDetails stepId={5} />
      </div>
      <Footer />
    </div>
  );
}

export default HowItsWork;
