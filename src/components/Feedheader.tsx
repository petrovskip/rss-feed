import { FormEvent, useRef } from "react";
import { Form } from "react-bootstrap";
import { Standard2RSSFormatHeader } from "react-rss/types";

export type CustomRssHeaderProps = {
    hasImage: Boolean,
    search: (query: string) => void
}

const FeedHeader = (props: Standard2RSSFormatHeader & CustomRssHeaderProps) => {

    const searchQeury = useRef<HTMLInputElement>(null); 

    const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            event.preventDefault();
            props.search((searchQeury.current?.value ? searchQeury.current.value : ""));
        }
      };

    const inputHandler =  (event: FormEvent<HTMLInputElement>) => {
        props.search((searchQeury.current?.value ? searchQeury.current.value : ""));
    }

    return (
        <header className="blog-header py-3">
            <div className="text-center">
                <h2>
                    <a className="blog-header-logo text-dark" href={props.link}>
                        {
                            props.hasImage &&
                            // @ts-ignore:next-line
                            <img src={props.image?.url.text} alt={props.image?.title.text} />
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
                        <Form.Control ref={searchQeury} type="text" placeholder="Search..." onKeyPress={keyPressHandler} onInput={inputHandler} />
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