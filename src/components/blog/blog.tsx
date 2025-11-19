import Footer from "../footer/footer";
import ResponsiveAppHeaderBar from "../header/ResponsiveAppHeaderBar";

function Blog() {
    return (
        <div style={{alignItems: 'center'}}>
            <ResponsiveAppHeaderBar/>
            <div style={{alignItems: 'center', minHeight: '630px'}}>
                <iframe
                width="560" height="315"
                src={`https://www.youtube.com/embed/vM2AnNnQ0IY?si=5r_LZOYU77z6LToz`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </div>
            <Footer/>
        </div>
    )
}

export default Blog;