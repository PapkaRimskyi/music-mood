function AppInfo() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className={`text-3xl md:text-6xl uppercase text-center text-neonPink align-middle [text-shadow:_0_-5px_13px_red]`}>
          Music
          <span style={{ fontFamily: "Arial" }}>&#8226;</span>
          mood
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
