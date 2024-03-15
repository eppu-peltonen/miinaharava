type StatsProps = {
    time: string;
}

const Stats = ({time}: StatsProps) => {
    return (
        <div className="m-auto bg-slate-700 rounded-xl p-2 flex flex-col items-center min-h-96 min-w-80">
            <span className="text-white font-bold text-3xl mt-2">Voitit pelin!</span>
            <span className="bg-slate-500 rounded-xl shadow-lg text-white font-bold p-2 mt-10">Aika: {time}</span>
        </div>
    );
}

export default Stats;