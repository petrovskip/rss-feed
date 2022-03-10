import { FormEvent, useCallback, useState } from 'react';
import rssEnhancer, { InjectionRSSProps } from 'react-rss';
import debounce from 'lodash.debounce';
import FeedHeader, { CustomRssHeaderProps } from './FeedHeader';
import FeedItem, { CustomRssItemProps } from './FeedItem';
import { Standard2RSSFormatItem } from 'react-rss/types';

export const searchFn = (items: (Standard2RSSFormatItem & CustomRssItemProps)[], query: string) => {
    return items.filter(item => {
        return (item.author.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                (item.categories && item.categories.some(category => category.toLowerCase().includes(query))) ||
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query));
    })
}



const Layout = (props: InjectionRSSProps<CustomRssHeaderProps, CustomRssItemProps>) => {
    const [searchFeed, setSearchFeed] = useState(props.rss.items);

    const debouncedFilter = useCallback(debounce((query: string) => {
            if(!query) setSearchFeed(props.rss.items) ;
            setSearchFeed(searchFn(props.rss.items, query));
        }, 300), []);

    const searchCallback = (query: string) => {
        debouncedFilter(query.toLowerCase())
    }

    return(
        <div className="container">
            <FeedHeader {...props.rss.header} search={searchCallback} />
            <main>
                    {searchFeed.map((item, index) => (
                        <FeedItem key={`item_${index}`} {...item} />
                    ))}
            </main>
        </div>
    )
};

export default rssEnhancer(
    Layout,
    'rss-feed',
    undefined,
    (rss, header) => { // Enhances header portion of result
        return { ...header, hasImage: Boolean(rss.image) };
    },
    (rssItem, item) => { // Enhances each item by json property
        let result: any = {...item};
        if(Array.isArray(rssItem['category'])){
            const categories = rssItem['category'].map(category => category.text as string);
            result = {...result, categories}
        }
        if(rssItem['dc:creator'])
            result.author = rssItem['dc:creator'].text;
        if(rssItem['content:encoded'])
            result.content = rssItem['content:encoded'].text;
        return result;
    }
);