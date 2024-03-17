type StatsProps = {
    time: number;
}

const Stats = ({time}: StatsProps) => {

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return (
        <div className="m-auto rounded-xl p-2 flex flex-col items-center">
            <span className="text-white font-bold text-3xl mt-6">Voitit pelin!</span>
            <span className="bg-slate-500 rounded-xl shadow-lg text-white font-bold p-2 mt-4">
                Aika: {hours}h {minutes}min {seconds.toString().padStart(2, "0")}s {milliseconds.toString().padStart(2, "0")}ms
            </span>
        </div>
    );
}

export default Stats;