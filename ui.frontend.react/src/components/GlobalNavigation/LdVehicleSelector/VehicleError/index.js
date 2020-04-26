import { Text } from '@sitecore-jss/sitecore-jss-react';
import React, {Component} from 'react';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import RichText from '../../components/RichText';

class VehicleError extends Component {
    render() {
        return (
            <div className="row dispMsgWrapper veh-error pg-box">
                <div className="col">
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle>
                                <Text field={this.props.datasource.title.jss} />
                            </CardTitle>
                            <CardText className="col-12 col-lg-8 m-auto">
                                <RichText field={this.props.datasource.body.jss} />
                            </CardText>
                            <Button
                                data-metrics-event-name="73.7"
                                data-metrics-subsection="Home"
                                data-metrics-module="Vehicle Module"
                                data-metrics-action={this.props.datasource.buttonLabel.jss.value}
                                data-metrics-content_title={this.props.datasource.title.jss.value}
                                tag="a"
                                className="btn-black"
                                href={this.props.datasource.successPageUrl.jss.value.href}
                                target="_blank"
                            >
                                {this.props.datasource.buttonLabel.jss.value}
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default VehicleError;
