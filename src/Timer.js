import React from "react";
import * as happy from './happy';

export default class Timer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      endDate: new Date('26 Mar 2021, 15:45:00'),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      errorMsg: ''
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.happyTimer);
  }

  componentDidMount() {
    document.title = 'PUHKUS!!';
    this.calculateCountdown();
    this.changePictureLoop();
  }

  // PICTURE CHANGE STUFF
  /**
   * its still frickin' buggy as hell
   * but hey, at least it somewhat works
   * better than nothin'
   */
  changePictureLoop = async () => {

    let minutesToMillisec = (minutes) => {
      return minutes * 60000;
    }

    let timeGap = minutesToMillisec(0.25);

    for (let i = 1; i <= 5; i++) {
      // happy['happy1']['default] => '/static/media/happy1.51fe64e8.jpg'
      //console.log(happy[`happy${i}`]['default']);

      let mmm = (i) => {
        setTimeout(() => {
          /**
           * if im gonna directly edit body background image anyways
           * why bother putting the image link into a state variable?...
           * 
           * it's like putting cereal into a bowl and milk into a huge cup,
           * instead of mixing them up right away / making cereal
          */
          //this.setState({happy: happy[`happy${i}`]['default']});
          //document.body.style.backgroundImage = `url(${this.state.happy})`;
          document.body.style.backgroundImage = `url(${happy[`happy${i}`]['default']})`;

          //console.log(i);
        }, timeGap + (timeGap * i));
      };

      mmm(i);
    }
    this.happyTimer = setTimeout(this.changePictureLoop, timeGap * 5);
  }

  // DATE STUFF

  onEndDateChange = endDate => {
    this.setState({ endDate });
  }

  getTwoDigitValue = value => {
    if (value < 10) {
      return '0' + value;
    }
    return '' + value;
  }
  
  calculateCountdown = () => {
    const startDate = new Date();
    const { endDate } = this.state;
    
    this.setState({ errorMsg: '' });
    
    const timeRemaining = endDate.getTime() - startDate.getTime();

    if(timeRemaining > 0) {
      const start_date = new Date(startDate);
      const end_date = new Date(endDate);
      const start_millis = start_date.getTime(); // Get timestamp of start date
      const end_millis = end_date.getTime(); // Get timestamp of end date

      // Convert to seconds, 1 second = 1000 milli seconds
      const old_sec = start_millis / 1000;
      const current_sec = end_millis / 1000;

      // Get remaining seconds
      let seconds = current_sec - old_sec;

      let days = Math.floor(seconds / (24 * 60 * 60)); // 1 day is equal to 24 hours, each hour has 60 mins and 60 seconds
      seconds -= days * 24 * 60 * 60; // Get remaining seconds

      let hours = Math.floor(seconds / (60 * 60)); // 1 hour has 60 mins and 60 seconds
      seconds -= hours * 60 * 60; // Get remaining seconds

      let minutes = Math.floor(seconds / 60); // 1 minute is equal to 60 seconds
      seconds -= minutes * 60; // Get remaining seconds

      days    = Math.abs(days);
      hours   = Math.abs(hours);
      minutes = Math.abs(minutes);
      seconds = Math.floor(Math.abs(seconds));

      this.setState(() => ({
        days, hours, minutes, seconds
      }), () => {
        this.timer = setTimeout(this.calculateCountdown, 1000);
      });
    } else {
      this.setState({ errorMsg: 'Times up!'});
      clearTimeout(this.timer);
    }
  };

  render() {
    const { days, hours, minutes, seconds, errorMsg } = this.state;
    const convertedDays = this.getTwoDigitValue(days);
    const convertedHours = this.getTwoDigitValue(hours);
    const convertedMins = this.getTwoDigitValue(minutes);
    const convertedSeconds = this.getTwoDigitValue(seconds);

    return (
      <div>
        <div className="date-time-form">
          {<h1>JÕULUPUHKUS!!! :D</h1>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>
        <div className="counter">
          <div className="time">
              <div className="time-value">{convertedDays}</div>
              <div className="time-label">päeva</div>
          </div>
          <div className="time">
          <div className="time-value">{convertedHours}</div>
          <div className="time-label">tundi</div>
          </div>
          <div className="time">
              <div className="time-value">{convertedMins}</div>
              <div className="time-label">minutit</div>
          </div>
          <div className="time">
              <div className="time-value">{convertedSeconds}</div>
              <div className="time-label">sekundit</div>
          </div>
      </div>
      <h1><i>YOOOOO PUHKUS TULEB!! NICE</i></h1>
      </div>
    );
  }
}
