import {Helmet} from "react-helmet-async";

const MetaData = ({title}:{title:string}) => {
    return (
        <Helmet>
            <title>{`${title} | Blog App`}</title>
        </Helmet>
    )
}

export default MetaData