import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
type Props = {
  seconds: number;
};
export default function Countdown({ seconds }: Props) {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  return (
    <NumberFlowGroup>
      <div
        // style={{ fontVariantNumeric: 'tabular-nums', '--number-flow-char-height': '0.85em' }}
		style={{ fontVariantNumeric: 'tabular-nums'}}
        className="text-[20vw] text-white flex items-baseline font-semibold overflow-hidden mx-auto"
      >
        {hh > 0 ? (
          <div className="flex flex-col">
            <NumberFlow
              trend={-1}
              value={hh}
              format={{ minimumIntegerDigits: 2 }}
            />
            <span className="text-[4vw] mx-auto relative -mt-10">HOURS</span>
          </div>
        ) : null}

        <div className="flex flex-col">
          <NumberFlow
            prefix={hh > 0 ? ":" : ""}
            trend={-1}
            value={mm}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
          />
          <span className="text-[4vw] mx-auto relative -mt-10">MINUTES</span>
        </div>
        <div className="flex flex-col">
          <NumberFlow
            prefix=":"
            trend={-1}
            value={ss}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
          />
          <span className="text-[4vw] mx-auto relative -mt-10">SECONDS</span>
        </div>
      </div>
    </NumberFlowGroup>
  );
}
