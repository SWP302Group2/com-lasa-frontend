import "../../assets/css/slide.css"

function Slide({ slide }) {
    return (
        <div className="slide">
            <img
                src={slide.imgUrl} alt="FPT University"
                className="slide__background"
            />
            <div className="slide__header">{slide.header}</div>
            <div className="slide__content">{slide.content}</div>
        </div>
    );
}

export default Slide;