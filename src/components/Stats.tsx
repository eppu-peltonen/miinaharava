type StatsProps = {
    time: number;
}

const Stats = ({time}: StatsProps) => {

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return (
        <div className="m-auto bg-slate-700 rounded-xl p-2 flex flex-col items-center min-h-96 min-w-80">
            <span className="text-white font-bold text-3xl mt-2">Voitit pelin!</span>
            <span className="bg-slate-500 rounded-xl shadow-lg text-white font-bold p-2 mt-10">
                Aika: {hours}h {minutes.toString().padStart(2, "0")}min {seconds.toString().padStart(2, "0")}s {milliseconds.toString().padStart(2, "0")}mm
            </span>
        </div>
    );
}

export default Stats;