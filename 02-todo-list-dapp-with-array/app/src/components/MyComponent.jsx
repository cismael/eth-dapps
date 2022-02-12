import React from 'react';

import {newContextComponents} from "@drizzle/react-components";

// Import display functions
import getActiveAccountDisplay from "./GetActiveAccountDisplay";
import createTodo from "./CreateTodo";
import getTodosList from "./TodoList";

const { AccountData, ContractData, ContractForm } = newContextComponents;

class MyComponent extends React.PureComponent {

    render() {
        // console.log("props ===> ", this.props);
        const {drizzle, drizzleState} = this.props;
        const { accounts } = drizzleState;

        return (
            <>
                <div className="App">
                    <div className="section">
                        <AccountData drizzle={drizzle} drizzleState={drizzleState}
                             accountIndex={0}
                             units="ether"
                             precision={3}
                             render={({ address, balance, units }) => (
                                <>
                                    {getActiveAccountDisplay({ address, balance, units })}
                                </>
                             )}
                        />
                    </div>

                    <hr/>

                    {/* Create Todo */}
                    <div className="section card">                        
                        <div className="row">
                            <div className="col-sm-12">
                                <h2 className="orange">Create Task</h2>
                            </div>
                        </div>
                        <div className="row">
                            {/* ContractForm is for functions in the smart contract that need to change data on the blockchain */}
                            <ContractForm drizzle={drizzle} contract="ToDo"
                                method="createTask"
                                labels={['new task to do', 'author of the task']}
                                sendArgs={{ from: accounts[0], gas: 6721975, gasPrice: 50000000000}}                                
                                render={({ inputs, inputTypes, state, handleInputChange, handleSubmit }) => (
                                    <>
                                        {createTodo({inputs, inputTypes, state, handleInputChange, handleSubmit})}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <hr/>

                    {/* Get Todos */}
                    <div className="section card">
                        <ContractData drizzle={drizzle} drizzleState={drizzleState}
                            contract="ToDo"
                            method="getTasks"
                            render={(tasks) => (
                                <>
                                    {getTodosList({tasks})}                       
                                </>
                            )}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default MyComponent;