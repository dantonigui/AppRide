const speedElement = document.querySelector("#speed")
const startBtn = document.querySelector("#btn-start")
const stopBtn = document.querySelector("#btn-stop")


let watchID = null
let currentRide = null
startBtn.addEventListener("click", () => {
    if (watchID)
        return
    function handleSucess(position){
        addPosition(currentRide, position)
        speedElement.innerHTML = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) : 0
    }

    function handleError(error){

    }

    const options = {enableHighAccuracy: true}
    currentRide = createNewRide()
    watchID = navigator.geolocation.watchPosition(handleSucess, handleError, options)
    startBtn.classList.add("d-none")
    stopBtn.classList.remove("d-none")

})

stopBtn.addEventListener("click", ()=>{
    if(!watchID)
        return
    navigator.geolocation.clearWatch(watchID)
    watchID = null
    updateStopTime(currentRide)
    currentRide = null
    stopBtn.classList.add("d-none")
    startBtn.classList.remove("d-none")
    
    window.location.href = "./"
})