import "../assets/css/loadingEffect.css";

function LoadingEffect() {
    return (
        <div className="loader">
            <div class="loader__icon">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="loader__content">LOADING...</div>
        </div>

    );
}

export default LoadingEffect;