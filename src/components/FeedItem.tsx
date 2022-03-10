import React, { useState } from "react";
import {  Card } from "react-bootstrap";
import { Standard2RSSFormatItem } from "react-rss/types";

export type CustomRssItemProps = {
    categories?: string[],
    content?: string;
}

const Feeditem = (props: Standard2RSSFormatItem & CustomRssItemProps) => {
    const [showInfo, setShowInfo] = useState(true);

    const renderWholePage = () => {
        if (props.content)
            return (
                <div dangerouslySetInnerHTML={{ __html: props.content }}>
                </div>
            );
        return (null)
    }

    return (
        <Card style={{ marginBottom: '2rem' }}>
            <Card.Header onClick={() => setShowInfo(!showInfo)}>
                <div className="row card-pointer">
                    <div className="card-name col">{props.author}</div>
                    <div className="card-date col">{props.pubDate}</div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Categories:
                    {props.categories ?
                        props.categories.reduce((result: string, category: string) => { return result + " " + category}, " ")
                        :
                        " " + props.category
                    }
                </Card.Subtitle>
                {showInfo ?
                    (<React.Fragment>
                        <Card.Text dangerouslySetInnerHTML={{ __html: props.description }} />
                        <Card.Link href={props.link} target="_blank">Go to blog post</Card.Link>
                    </React.Fragment>
                    )
                    :
                    renderWholePage()
                }

            </Card.Body>
        </Card>
    );
};

export default Feeditem;