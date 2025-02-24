import React, { useState, useEffect, useContext } from 'react'
import styles from './profile.module.css'
import { AuthContext } from '../authContext'

const host = process.env.NEXT_PUBLIC_HOST

function MyEvents() {
    const [events, setEvents] = useState({ solo: [], team: [] })
    const [passes, setPasses] = useState([])
    const userData = useContext(AuthContext)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
    }
    useEffect(() => {
        const res = fetch(`${host}/event/myevents`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let arr = []
                setEvents(result)
                console.log(result)
            })
            .catch((error) => console.log('error', error))
    }, [])

    useEffect(() => {
        const fetchFestPasses = async () => {
            try {
                var myHeaders = new Headers()
                myHeaders.append('Content-Type', 'application/json')

                var raw = JSON.stringify({
                    anwesha_id: userData.state.user.anwesha_id,
                })

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                    credentials: 'include',
                }

                const response = await fetch(
                    `${host}/festpasses/get`,
                    requestOptions
                )

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const data = await response.json()
                if (data.message == 'You are already registered') {
                    setPasses([
                        {
                            event_name: 'Festival Pass',
                            event_start_time: '2025-02-09T15:30:00Z',
                        },
                    ])
                }
            } catch (error) {
                console.error('Error fetching fest passes:', error)
            }
        }

        fetchFestPasses()
    }, [])

    return (
        // <div>
        //     {events.solo.length === 0 &&
        //         events.team.length === 0 &&
        //         passes.length === 0 ? (
        //         <div>No events registered</div>
        //     ) : null}
        //     {passes.map((e, key) => {
        //         return (
        //             <div key={key} className={styles.pass}>
        //                 <h2>{e.event_name}</h2>
        //                 {e.payment_done ? (
        //                     <div className={styles.verified_img}>
        //                         <img src="assets/tick-green.svg" />
        //                         Registration Complete
        //                     </div>
        //                 ) : (
        //                     <a
        //                         className={styles.payment_btn}
        //                         href={e.payment_url}
        //                     >
        //                         Continue to payment{' '}
        //                         <img src="/assets/right-arrow.svg" />
        //                     </a>
        //                 )}
        //             </div>
        //         )
        //     })}
        //     {events.solo ? (
        //         events.solo.length !== 0 ? (
        //             <div>
        //                 <h1>Solo Events</h1>
        //                 <div
        //                     style={{
        //                         display: 'flex',
        //                         flexWrap: 'wrap',
        //                         justifyContent: 'center',
        //                     }}
        //                 >
        //                     {events.solo.map((e, key) => {
        //                         if (e.event_tags !== '6') {
        //                             return (
        //                                 <div key={key} className={styles.event}>
        //                                     <h2>{e.event_name}</h2>
        //                                     <div className={styles.date_loc}>
        //                                         <div
        //                                             className={styles.date_row}
        //                                         >
        //                                             <img src="/assets/calendar-clock.svg" />
        //                                             <div
        //                                                 className={styles.date}
        //                                             >
        //                                                 <span
        //                                                     className={
        //                                                         styles.day
        //                                                     }
        //                                                 >
        //                                                     {new Date(
        //                                                         e.event_start_time
        //                                                     ).toLocaleString(
        //                                                         'default',
        //                                                         {
        //                                                             day: 'numeric',
        //                                                         }
        //                                                     )}
        //                                                 </span>
        //                                                 <span
        //                                                     className={
        //                                                         styles.month
        //                                                     }
        //                                                 >
        //                                                     {new Date(
        //                                                         e.event_start_time
        //                                                     ).toLocaleString(
        //                                                         'default',
        //                                                         {
        //                                                             month: 'short',
        //                                                         }
        //                                                     )}
        //                                                 </span>
        //                                             </div>
        //                                             {e.event_end_time ? (
        //                                                 <div>-</div>
        //                                             ) : null}
        //                                             {e.event_end_time ? (
        //                                                 <div
        //                                                     className={
        //                                                         styles.date
        //                                                     }
        //                                                 >
        //                                                     <span
        //                                                         className={
        //                                                             styles.day
        //                                                         }
        //                                                     >
        //                                                         {new Date(
        //                                                             e.event_end_time
        //                                                         ).toLocaleString(
        //                                                             'default',
        //                                                             {
        //                                                                 day: 'numeric',
        //                                                             }
        //                                                         )}
        //                                                     </span>
        //                                                     <span
        //                                                         className={
        //                                                             styles.month
        //                                                         }
        //                                                     >
        //                                                         {new Date(
        //                                                             e.event_end_time
        //                                                         ).toLocaleString(
        //                                                             'default',
        //                                                             {
        //                                                                 month: 'short',
        //                                                             }
        //                                                         )}
        //                                                     </span>
        //                                                 </div>
        //                                             ) : null}
        //                                         </div>
        //                                         <div
        //                                             className={styles.location}
        //                                         >
        //                                             <img src="/assets/location.svg" />
        //                                             {e.event_venue}
        //                                         </div>
        //                                     </div>
        //                                     {e.payment_done ? (
        //                                         <div
        //                                             className={
        //                                                 styles.verified_img
        //                                             }
        //                                         >
        //                                             <img src="assets/tick-green.svg" />
        //                                             Registration Complete
        //                                         </div>
        //                                     ) : (
        //                                         <a
        //                                             className={
        //                                                 styles.payment_btn
        //                                             }
        //                                             href={e.payment_url}
        //                                         >
        //                                             Continue to payment{' '}
        //                                             <img src="/assets/right-arrow.svg" />
        //                                         </a>
        //                                     )}
        //                                     {e.payment_url ? (
        //                                         <a
        //                                             className={
        //                                                 styles.verified_img
        //                                             }
        //                                             href={e.payment_url}
        //                                             target="_blank"
        //                                             rel="noreferrer"
        //                                         >
        //                                             <img src="assets/WhatsApp.svg" />
        //                                             Join Group
        //                                         </a>
        //                                     ) : null}
        //                                 </div>
        //                             )
        //                         }
        //                     })}
        //                 </div>
        //             </div>
        //         ) : null
        //     ) : null}
        //     {events.team ? (
        //         events.team.length !== 0 ? (
        //             <div>
        //                 <h1>Team Events</h1>
        //                 <div
        //                     style={{
        //                         display: 'flex',
        //                         flexWrap: 'wrap',
        //                         justifyContent: 'center',
        //                     }}
        //                 >
        //                     {events.team.map((e, key) => {
        //                         return (
        //                             e.payment_done &&
        //                             <div key={key} className={styles.event}>
        //                                 <h2>{e.event_name}</h2>
        //                                 <div className={styles.date_loc}>
        //                                     <div className={styles.date_row}>
        //                                         <img src="/assets/calendar-clock.svg" />
        //                                         <div className={styles.date}>
        //                                             <span
        //                                                 className={styles.day}
        //                                             >
        //                                                 {new Date(
        //                                                     e.event_start_time
        //                                                 ).toLocaleString(
        //                                                     'default',
        //                                                     { day: 'numeric' }
        //                                                 )}
        //                                             </span>
        //                                             <span
        //                                                 className={styles.month}
        //                                             >
        //                                                 {new Date(
        //                                                     e.event_start_time
        //                                                 ).toLocaleString(
        //                                                     'default',
        //                                                     { month: 'short' }
        //                                                 )}
        //                                             </span>
        //                                         </div>
        //                                         {e.event_end_time ? (
        //                                             <div>-</div>
        //                                         ) : null}
        //                                         {e.event_end_time ? (
        //                                             <div
        //                                                 className={styles.date}
        //                                             >
        //                                                 <span
        //                                                     className={
        //                                                         styles.day
        //                                                     }
        //                                                 >
        //                                                     {new Date(
        //                                                         e.event_end_time
        //                                                     ).toLocaleString(
        //                                                         'default',
        //                                                         {
        //                                                             day: 'numeric',
        //                                                         }
        //                                                     )}
        //                                                 </span>
        //                                                 <span
        //                                                     className={
        //                                                         styles.month
        //                                                     }
        //                                                 >
        //                                                     {new Date(
        //                                                         e.event_end_time
        //                                                     ).toLocaleString(
        //                                                         'default',
        //                                                         {
        //                                                             month: 'short',
        //                                                         }
        //                                                     )}
        //                                                 </span>
        //                                             </div>
        //                                         ) : null}
        //                                     </div>
        //                                     <div className={styles.location}>
        //                                         <img src="/assets/location.svg" />
        //                                         {e.event_venue}
        //                                     </div>
        //                                 </div>
        //                                 <div className={styles.team_details}>
        //                                     <h3>{e.team_name}</h3>
        //                                     <h4>
        //                                         Leader:{' '}
        //                                         <strong>{e.team_lead}</strong>
        //                                     </h4>
        //                                     <div className={styles.members}>
        //                                         {e.team_members.map(
        //                                             (mem, key) => {
        //                                                 return (
        //                                                     <div key={key}>
        //                                                         {mem}
        //                                                     </div>
        //                                                 )
        //                                             }
        //                                         )}
        //                                     </div>
        //                                 </div>
        //                                 {e.payment_done ? (
        //                                     <div
        //                                         className={styles.verified_img}
        //                                     >
        //                                         <img src="assets/tick-green.svg" />
        //                                         Registration Complete
        //                                     </div>
        //                                 ) : (
        //                                     <a
        //                                         className={styles.payment_btn}
        //                                         href={e.payment_url}
        //                                     >
        //                                         Continue to payment{' '}
        //                                         <img src="/assets/right-arrow.svg" />
        //                                     </a>
        //                                 )}
        //                                 {e.payment_url ? (
        //                                     <a
        //                                         className={styles.verified_img}
        //                                         href={e.payment_url}
        //                                         target="_blank"
        //                                         rel="noreferrer"
        //                                     >
        //                                         <img src="assets/WhatsApp.svg" />
        //                                         Join Group
        //                                     </a>
        //                                 ) : null}
        //                             </div>

        //                         )
        //                     })}
        //                 </div>
        //             </div>
        //         ) : null
        //     ) : null}
        // </div>

        <div className={styles.eventsInfo}>
            {!events.solo ||
            (events.solo.length === 0 &&
                events.team.length === 0 &&
                passes.length === 0) ? (
                <div>No events registered</div>
            ) : null}
            {passes.length !== 0 ? (
                <div>
                    <div className={styles.eventsHeading}>Passes</div>
                    {passes.map((e, key) => {
                        return (
                            <div key={key} className={styles.pass}>
                                <img src={'/pics/pass.png'}></img>
                                <div className={styles.passDetail}>
                                    <div
                                        style={{
                                            fontFamily: 'Laila-Bold',
                                        }}
                                    >
                                        {e.event_name}
                                    </div>
                                    <div>8 & 9 Feb, 8 PM Onwards</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : null}
            {(events.solo || events.team) &&
            (events.solo.length !== 0 || events.team.length !== 0) ? (
                <div>
                    <div className={styles.eventsHeading}>
                        Registered Events
                    </div>
                    {events.solo.map((e, key) => {
                        return (
                            <div key={key} className={styles.pass}>
                                <img src={'/pics/pass.png'}></img>
                                <div className={styles.passDetail}>
                                    <div
                                        style={{
                                            fontFamily: 'Laila-Bold',
                                        }}
                                    >
                                        {e.event_name}
                                    </div>
                                    <div>
                                        {new Date(
                                            e.event_start_time
                                        ).toLocaleString('default', {
                                            day: 'numeric',
                                        })}{' '}
                                        {new Date(
                                            e.event_start_time
                                        ).toLocaleString('default', {
                                            month: 'short',
                                        })}
                                        {' , '}
                                        {new Date(
                                            e.event_start_time
                                        ).toLocaleString('default', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                        {' - '}
                                        {new Date(
                                            e.event_end_time
                                        ).toLocaleString('default', {
                                            day: 'numeric',
                                        })}{' '}
                                        {new Date(
                                            e.event_end_time
                                        ).toLocaleString('default', {
                                            month: 'short',
                                        })}
                                        {' , '}
                                        {new Date(
                                            e.event_end_time
                                        ).toLocaleString('default', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}{' '}
                                        {`(${e.event_venue})`}
                                    </div>
                                    <div>
                                        {e.payment_url != '' ? (
                                            <a
                                                href={e.payment_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Submission link
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {events.team.map((e, key) => {
                        return (
                            e.payment_done && (
                                <div key={key} className={styles.pass}>
                                    <img src={'/pics/pass.png'}></img>
                                    <div className={styles.passDetail}>
                                        <div
                                            style={{
                                                fontFamily: 'Laila-Bold',
                                            }}
                                        >
                                            {e.event_name}
                                        </div>
                                        <div>
                                            Team : {e.team_name}
                                            &nbsp;&nbsp;
                                            {e.payment_url != '' ? (
                                                <a
                                                    href={e.payment_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Submission link
                                                </a>
                                            ) : null}
                                        </div>
                                        <div>
                                            {new Date(
                                                e.event_start_time
                                            ).toLocaleString('default', {
                                                day: 'numeric',
                                            })}{' '}
                                            {new Date(
                                                e.event_start_time
                                            ).toLocaleString('default', {
                                                month: 'short',
                                            })}
                                            {' , '}
                                            {new Date(
                                                e.event_start_time
                                            ).toLocaleString('default', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                            {' - '}
                                            {new Date(
                                                e.event_end_time
                                            ).toLocaleString('default', {
                                                day: 'numeric',
                                            })}{' '}
                                            {new Date(
                                                e.event_end_time
                                            ).toLocaleString('default', {
                                                month: 'short',
                                            })}
                                            {' , '}
                                            {new Date(
                                                e.event_end_time
                                            ).toLocaleString('default', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}{' '}
                                            {`(${e.event_venue})`}
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
            ) : null}

            {/* <div>
                <div className={styles.eventsHeading}>Event Passes</div>
                <div className={styles.pass}>
                    <img src={'/pics/pass.png'}></img>
                    <div className={styles.passDetail}>
                        <div
                            style={{
                                fontFamily: 'Laila-Bold',
                            }}
                        >
                            Pronite Pass
                        </div>
                        <div>18 March 2024</div>
                        <div>09:00</div>
                    </div>
                </div>
            </div> */}

            {/* <div>
                <div className={styles.eventsHeading}>Registered Events</div>
                <div className={styles.pass}>
                    <img src={'/pics/pass.png'}></img>
                    <div className={styles.passDetail}>
                        <div
                            style={{
                                fontFamily: 'Laila-Bold',
                            }}
                        >
                            Pronite Pass
                        </div>
                        <div>18 March 2024</div>
                        <div>09:00</div>
                    </div>
                </div>
                <div className={styles.pass}>
                    <img src={'/pics/pass.png'}></img>
                    <div className={styles.passDetail}>
                        <div
                            style={{
                                fontFamily: 'Laila-Bold',
                            }}
                        >
                            Pronite Pass
                        </div>
                        <div>18 March 2024</div>
                        <div>09:00</div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default MyEvents
