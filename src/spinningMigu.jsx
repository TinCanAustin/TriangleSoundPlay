import spinningMiku from "/miku-hatsune.gif";

function SpinningMigu(){
    function redirect(){
        window.location.href = "https://www.youtube.com/watch?v=UIp6_0kct_U";
    }

    return(
        <img src={spinningMiku} height={80} onClick={redirect} className="migu"/>
    );
}

export default SpinningMigu;