const CircleProgress = () => {
  return (
    <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        strokeDasharray="565.48"
        strokeDashoffset="0"
      ></circle>
      <circle
        id="bar"
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        strokeDasharray="565.48"
        strokeDashoffset="0"
      ></circle>
    </svg>
  )
}

export default CircleProgress
