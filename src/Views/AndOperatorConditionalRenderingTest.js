import React from "react";
import PropTypes from "prop-types";

function AndOperatorConditionalRenderingTest(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 && (
            <div>
                <h2>You have {unreadMessages.length} unread messages.</h2>
                <p>You should go to your inbox ASAP - the message could be from Sahbi!</p>
            </div>
            )}

            {unreadMessages.length === 0 && (
                <h2>Nice work, you have no messages.</h2>
            )}
        </div>
    );
}

AndOperatorConditionalRenderingTest.propTypes = {
    unreadMessages: PropTypes.array.isRequired,
};

export default AndOperatorConditionalRenderingTest;

