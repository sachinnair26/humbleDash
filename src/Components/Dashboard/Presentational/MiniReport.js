import React from 'react'
import { Tabs, Slider } from 'antd'
import './minireport.css'
const TabPane = Tabs.TabPane

const MiniReport = ({
  good,
  bad,
  average,
  dateList,
  device,
  onChangeSlider,
  thresholdAvgHigh,
  thresholdAvgSecondHigh,
  thresholdBadHigh,
  thresholdBadSecondHigh,
  thresholdGood,
  location
}) => {
  var hours = [
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '01',
    '02',
    '03',
    '04'
  ]

  return (
    <div>
      <h1>{location}</h1>

      <Tabs type='card'>
        <TabPane tab='Good' key='Good'>
          <div style={{ width: '10%' }}>
            Threshold Value
            <Slider
              value={thresholdGood}
              onChange={e => {
                onChangeSlider('thresholdGood', e)
              }}
              min={1}
              max={10}
              marks={{
                10: {
                  style: {
                    color: 'green'
                  },
                  label: <strong>Green</strong>
                }
              }}
            />
          </div>
          <table className='table1'>
            <tbody>
              <tr>
                <th>Date</th>
                {hours.map(o => (
                  <th style={{ textAlign: 'center' }}>{o}</th>
                ))}
              </tr>
              {dateList.map((
                c /// this is the mapping of each element of the arrya of the report
              ) => (
                // this is done by having 2 arrays one with 24 hours and one with the list of dates
                // using these 2 we map eachelemt on the table
                <tr>
                  <td
                    style={{
                      border: 'none',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    {c.slice(0, 10)}
                  </td>
                  {hours.map(d =>
                    good[c.toString()][Number(d).toString()] >=
                    thresholdGood ? (
                      <td style={{ backgroundColor: 'green' }}>
                          {good[c.toString()][Number(d).toString()]}
                        </td>
                      ) : (
                        <td>{good[c.toString()][Number(d).toString()]}</td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </TabPane>
        <TabPane tab='Bad' key='Bad'>
          <div style={{ width: '10%' }}>
            Threshold Value
            <Slider
              value={thresholdBadHigh}
              onChange={e => {
                onChangeSlider('thresholdBadHigh', e)
              }}
              min={1}
              max={10}
              marks={{
                10: {
                  style: {
                    color: 'red'
                  },
                  label: <strong>Red</strong>
                }
              }}
            />
            <Slider
              value={thresholdBadSecondHigh}
              onChange={e => {
                onChangeSlider('thresholdBadSecondHigh', e)
              }}
              min={1}
              max={10}
              marks={{
                10: {
                  style: {
                    color: 'yellow'
                  },
                  label: <strong>Yellow</strong>
                }
              }}
            />
          </div>
          <table className='table1'>
            <tbody>
              <tr>
                <th>Date</th>

                {hours.map(a => (
                  <th style={{ textAlign: 'center' }}>{a}</th>
                ))}
              </tr>

              {dateList.map(c => (
                <tr>
                  <td
                    style={{
                      border: 'none',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    {c.slice(0, 10)}
                  </td>
                  {hours.map(d =>
                    bad[c.toString()][Number(d).toString()] >=
                    thresholdBadHigh ? (
                      <td style={{ backgroundColor: 'red' }}>
                          {bad[c.toString()][Number(d).toString()]}
                        </td>
                      ) : bad[c.toString()][Number(d).toString()] >=
                      thresholdBadSecondHigh ? (
                          <td style={{ backgroundColor: 'yellow' }}>
                          {bad[c.toString()][Number(d).toString()]}
                        </td>
                        ) : (
                          <td>{bad[c.toString()][Number(d).toString()]}</td>
                        )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </TabPane>
        <TabPane tab='Average' key='Average'>
          <div style={{ width: '10%' }}>
            Threshold Value
            <Slider
              value={thresholdAvgHigh}
              onChange={e => {
                onChangeSlider('thresholdAvgHigh', e)
              }}
              min={1}
              max={10}
              marks={{
                10: {
                  style: {
                    color: 'red'
                  },
                  label: <strong>Red</strong>
                }
              }}
            />
            <Slider
              value={thresholdAvgSecondHigh}
              onChange={e => {
                onChangeSlider('thresholdAvgSecondHigh', e)
              }}
              min={1}
              max={10}
              marks={{
                10: {
                  style: {
                    color: 'yellow'
                  },
                  label: <strong>Yellow</strong>
                }
              }}
            />
          </div>
          <table className='table1'>
            <tbody>
              <tr>
                <th>Date</th>
                {hours.map(a => (
                  <th style={{ textAlign: 'center' }}>{a}</th>
                ))}
              </tr>

              {dateList.map(c => (
                <tr>
                  <td
                    style={{
                      border: 'none',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    {c.slice(0, 10)}
                  </td>
                  {hours.map(d =>
                    average[c.toString()][Number(d).toString()] >=
                    thresholdAvgHigh ? (
                      <td style={{ backgroundColor: 'red' }}>
                          {average[c.toString()][Number(d).toString()]}
                        </td>
                      ) : average[c.toString()][Number(d).toString()] >=
                      thresholdAvgSecondHigh ? (
                        <td style={{ backgroundColor: 'yellow' }}>
                            {average[c.toString()][Number(d).toString()]}
                          </td>
                        ) : (
                          <td>{average[c.toString()][Number(d).toString()]}</td>
                        )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MiniReport
