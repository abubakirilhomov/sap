import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ activeEvents }) => {
  console.log("Active Events:", activeEvents);

  const [countdowns, setCountdowns] = useState({});

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = activeEvents.reduce(
        (acc, event) => ({
          ...acc,
          [event.id]: calculateTimeLeft(event.deadline),
        }),
        {}
      );
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeEvents]);

  return (
    <div className="flex flex-wrap gap-6 p-4">
      {activeEvents.map((event) => {
        const countdown = countdowns[event.id] || {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };

        return (
          <div
            key={event.id}
            className="bg-base-300 w-full max-w-md min-h-[28rem] shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-4 px-2 pt-2 mb-2">
              <Link to={`/clubs/${event?.club_id?.id}`} className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={event?.club_id?.logo || 'default-logo.jpg'} alt={event?.club_id?.name || 'Club Logo'} />
                  </div>
                </div>
              </Link>
              <Link to={`/clubs/${event?.id}`} className="truncate">
                {event?.club_id?.name || 'Unknown Club'}
              </Link>
            </div>

            <img
              src={event.img || 'default-image.jpg'}
              alt={event.title || 'Event Image'}
              className="w-full h-60 object-cover aspect-[4/3]"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 truncate">{event.club_id?.name || 'Unknown Club'}</h3>
              <p className="mb-2 line-clamp-2">Event: {event.title || 'Untitled Event'}</p>
              <p className="text-sm mb-2">
                Deadline: {new Date(event.deadline).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
              <a
                href={event.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-info underline mb-2 block"
              >
                Learn More
              </a>
            </div>
            {/* Countdown Timer */}
            <div className="grid grid-flow-col gap-3 p-2 justify-center text-center auto-cols-max">
              <div className="flex flex-col">
                <span className="countdown font-mono text-4xl">
                  <span
                    style={{ "--value": countdown.days }}
                    aria-live="polite"
                    aria-label={`${countdown.days} days`}
                  >
                    {countdown.days}
                  </span>
                </span>
                d
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-4xl">
                  <span
                    style={{ "--value": countdown.hours }}
                    aria-live="polite"
                    aria-label={`${countdown.hours} hours`}
                  >
                    {countdown.hours}
                  </span>
                </span>
                h
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-4xl">
                  <span
                    style={{ "--value": countdown.minutes }}
                    aria-live="polite"
                    aria-label={`${countdown.minutes} minutes`}
                  >
                    {countdown.minutes}
                  </span>
                </span>
                m
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-4xl">
                  <span
                    style={{ "--value": countdown.seconds }}
                    aria-live="polite"
                    aria-label={`${countdown.seconds} seconds`}
                  >
                    {countdown.seconds}
                  </span>
                </span>
                s
              </div>
            </div>
            <div className="px-2 pb-2">
              <button className="btn w-full">Register</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventCard;