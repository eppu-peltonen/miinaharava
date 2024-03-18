import info from "../assets/info.svg";

interface TooltipProps {
    text: string;
}

const Tooltip = ({text} : TooltipProps) => {
    return (
        <div className="has-tooltip w-10 h-10 ml-4">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-slate-700 -mt-8">{text}</span>
            <img src={info} />
        </div>
    );
};

export default Tooltip;