import { Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <Box sx={{ position: "relative", overflow: "hidden", width: "100vw" }}>
            <Slider {...settings}>
                <div>
                    <img
                        src="/images/hero1.jpg"
                        alt="hero1"
                        style={{
                            display: "block",
                            width: "100vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div>
                    <img
                        src="/images/hero2.jpg"
                        alt="hero2"
                        style={{
                            display: "block",
                            width: "100vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div>
                    <img
                        src="/images/hero3.jpg"
                        alt="hero3"
                        style={{
                            display: "block",
                            width: "100vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </Slider>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    textAlign: "center",
                    zIndex: 2,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: "2rem", md: "4rem" }, mb: 4 }}
                >
                    Welcome to Haikt Store
                </Typography>
                <Button
                    component={Link}
                    to="/catalog"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                        px: 6,
                        py: 3,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
