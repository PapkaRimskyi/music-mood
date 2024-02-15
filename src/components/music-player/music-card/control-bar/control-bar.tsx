import style from './style.module.css';

function ControlBar() {
  return (
    <div className='flex items-center'>
      <div className={`flex ${style.controlButtonContainer}`}>
        <button className={`bg-no-repeat bg-center bg-contain ${style.controlButton}`} type="button" />
      </div>
      <div className={`flex mx-3 ${style.controlButtonContainer}`}>
        <button className={`bg-no-repeat bg-center bg-contain ${style.controlButton}`} type="button" />
      </div>
      <div className={`flex ${style.controlButtonContainer}`}>
        <button className={`bg-no-repeat bg-center bg-contain ${style.controlButton}`} type="button" />
      </div>
    </div>
  );
}

export default ControlBar;
