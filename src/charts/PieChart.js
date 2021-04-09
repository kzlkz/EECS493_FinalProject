import { Pie } from 'react-chartjs-2'


const BACKGROUNDCOLOR = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
]

const BORDERCOLOR = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

/*
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Category',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
*/

function processData(daily_activity) {

  var dataset = {
    label: "Category Chart",
    data: [],
    backgroundColor: BACKGROUNDCOLOR,
    borderColor: BORDERCOLOR,
    borderWidth: 1,
  }

  var data = {
    labels: [],
    datasets: [dataset]
  }

  var category_dict = {}
  var category_list = []
  daily_activity.forEach((item) => {
    //if (!(item.category in data.labels)) {
    if (!(data.labels.includes(item.category))) {
      data.labels.push(item.category)
      dataset.data.push(0)
    }
    dataset.data[data.labels.indexOf(item.category)] += item.duration
  })

  return data
}

const PieChart = (props) => {

  console.log(props.daily_activity);
  let chart_data = processData(props.daily_activity)

  return(
  <>
    <div className='header'>
      <h1 className='title'>Category Chart</h1>
    </div>
    <Pie data={chart_data} />
  </>
)
}

export default PieChart;