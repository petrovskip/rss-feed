import { FormEvent } from "react";
import { Form } from "react-bootstrap";
import { Standard2RSSFormatHeader } from "react-rss/types";

export type CustomRssHeaderProps = {
    hasImage: Boolean,
    search: (e: FormEvent<HTMLInputElement>) => void
}

const FeedHeader = (props: Standard2RSSFormatHeader & CustomRssHeaderProps) => {

    return (
        <header className="blog-header py-3">
            <div className="text-center">
                <h2>
                    <a className="blog-header-logo text-dark" href={props.link}>
                        {
                            props.hasImage &&
                            // @ts-ignore:next-line
                            <img src={props.image?.url.text} />
                        }
                        {props.title} feed
                    </a>
                </h2>
                <h4>
                    {props.description}
                </h4>
            </div>

            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search..." onInput={props.search} />
                        <Form.Text className="text-muted">
                            Search for titles, descriptions, categories, authors
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </header>
    )
};

export default FeedHeader;