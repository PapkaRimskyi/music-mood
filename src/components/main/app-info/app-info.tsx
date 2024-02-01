import style from './style.module.css';

function AppInfo() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className={`text-6xl uppercase text-center text-neonPink align-middle ${style.heading}`}>
          Find
          <span style={{ fontFamily: "Arial" }}>&#8226;</span>
          your
          <span style={{ fontFamily: "Arial" }}>&#8226;</span>
          music
        </h1>
      </div>
      <div className="space-y-3">
        <p className="text-neonWhite text-center">With this application, you are able to find any information about music artists using DeezerAPI</p>
        <p className="text-neonWhite text-center">For starting, write a name of artist inside input below</p>
      </div>
    </div>
  );
}

export default AppInfo;
