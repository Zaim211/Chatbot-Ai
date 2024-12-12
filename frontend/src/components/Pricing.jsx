import Section from "./Section";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import Title from "./Title";

const Pricing = () => {
  return (
    <Section className="overflow-hidden mt-32" id="pricing">
      <div className="container relative z-2">
        <Title
          tag="Commencez avec BotGeneration.Ai"
          title="Payez une fois, utilisez pour toujours"
        />

        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
