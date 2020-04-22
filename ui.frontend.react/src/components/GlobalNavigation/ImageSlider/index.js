import { Text } from '@sitecore-jss/sitecore-jss-react';
import React,{Component} from 'react';
import Slider from 'react-slick';
import { Card, CardBody, CardImg } from 'reactstrap';
import RouterLink from '../components/routerLink';

class ImageSlider extends Component {
    constructor(props) {
        super(props);
        this.counter = 0;
    }

    render() {
        const sliderContent = this.props.sliderContent;
        const settings = {
            autoplay: false,
            centerMode: false,
            dots: true,
            fade: true,
            infinite: false,
            lazyLoad : 'ondemand',
            nextArrow: undefined,
            prevArrow: undefined,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
            waitForAnimate: false,
        };

        return (
            <div className="ld-carousel nav-carousel" >
                <div className="col-md-12 m-auto"  id={this.props.id}>
                    <Slider {...settings} >
                        {sliderContent.map((i) => {
                              this.counter++;
                              return (
                                <div
                                        {...this.props.dataMetrics}
                                        data-metrics-nav_category={this.props.category}
                                        data-metrics-nav_subcategory={i.title.jss.value}
                                        key={this.counter}
                                >
                                        <RouterLink
                                            field={i.linkoutUrl}
                                            {...this.props.dataMetrics}
                                            tag_id="72.3"
                                            container="Global Nav"
                                            nav_category={this.props.category}
                                            nav_subcategory={i.title.jss.value}
                                        >
                                            <Card className="ld-tile" >
                                            <div className="nav-img-wrapper">
                                                <CardImg
                                                    top={true}
                                                    src={i.thumbnail.jss.value.src}
                                                />
                                            </div>
                                                <CardBody>
                                                <Text field={i.title.jss} className="card-subtitle" tag="h5"/>
                                                </CardBody>
                                            </Card>
                                        </RouterLink>
                                </div>
                            );
                        })
                        }
                    </Slider>
                </div>
            </div>
        );
    }

}

export default ImageSlider;
