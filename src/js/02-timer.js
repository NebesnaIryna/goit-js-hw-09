import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const windowTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerWindow = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');
const valueEl = document.querySelectorAll('.value');
const timerDays = timerWindow.querySelector('[data-days]');
const timerHours = timerWindow.querySelector('[data-hours]');
const timerMinutes = timerWindow.querySelector('[data-minutes]');
const timerSeconds = timerWindow.querySelector('[data-seconds]');

let start = null;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date().getTime()) {
      startBtn.disabled = true;
      return Notify.failure("Please choose a date in the future.");
    }
      startBtn.disabled = false;

    const timer = () =>  {
      start = setInterval(() => {

        startBtn.disabled = true;

          const startTime = new Date();
          let countDown = selectedDates[0] - startTime;
          const { days, hours, minutes, seconds } = convertMs(countDown);
    
          timerDays.textContent = `${days}`;
          timerHours.textContent = `${hours}`;
          timerMinutes.textContent = `${minutes}`;
          timerSeconds.textContent = `${seconds}`;
        
        windowTime.disabled = true;

               if (countDown < 1000) {
                 clearTimeout(start);
                return Notify.success("Congratulation, time is Ended.");
        }
      
      }, 1000)
      }
      startBtn.addEventListener('click', timer)
    },
};

flatpickr("#datetime-picker", options);

function pad(value) {
  return String(value).padStart(2, '0');
};

timerWindow.setAttribute('style', 'font-size: 30px');

