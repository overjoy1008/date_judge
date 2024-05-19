import "./guage.css"
import "@/presentation/assets/style/Global.css"

export default function Gauge() {

    // var gauge = new Gauge(document.getElementById("gauge"));
    // gauge.value(0.5);
    return (
        <div className="gauge gauge__liveupdate" id="gauge">
            <div className="gauge--container">
                <div className="gauge--marker"></div>
                <div className="gauge--background"></div>
                <div className="gauge--center"></div>
                <div className="gauge--data"></div>
                <div className="gauge--needle"></div>
            </div>
            <div className="gauge--labels mdl-typography--headline">
                <span className="gauge--label__low">E</span>
                <span className="gauge--label__spacer"></span>
                <span className="gauge--label__high">F</span>
            </div>
        </div>
    )
}