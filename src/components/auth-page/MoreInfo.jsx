import { useState } from "react";
import DefineRole from "./DefineRole";
import OptionalInfo from "./OptionalInfo";

function MoreInfo({ setPosition }) {
    const [moreInfoStep, setMoreInfoStep] = useState(1);

    return (
        <div className="sign-up__step  more-info">
            {moreInfoStep === 1 ? <DefineRole setMoreInfoStep={setMoreInfoStep} /> : null}
            {moreInfoStep === 2 ? <OptionalInfo setPosition={setPosition} setMoreInfoStep={setMoreInfoStep} /> : null}
        </div>
    );
}

export default MoreInfo;