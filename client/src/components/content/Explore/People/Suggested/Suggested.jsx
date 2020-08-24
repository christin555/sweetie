import React from "react";
import styles from "./Suggested.module.css";
import UserBlock from "../../../../shared/UserBlock/UserBlock";
import axios from "axios";

class Suggested extends React.Component{

    componentDidMount() {

        let i = {
            userId: 1,
            offset: 0,
            limit: 15
        };

        axios.post("http://localhost:3001/api/suggestedPeople/", i )
            .then(res => {
                this.props.getUsers(res.data.user_list);
            })
            .catch(err => {
                console.log("error in request", err);
            });
    }

    SuggestedElements = () => {
      return  this.props.users.map(el => {
                let button_follow;
                el.followed
                    ? button_follow =
                        <p onClick={() => this.props.unfollow(el.id)} className={`${styles.subsc} ${styles.unfollow}`}>Подписки </p>
                    : button_follow = <p onClick={() => this.props.follow(el.id)} className={styles.subsc}> Подписаться </p>

                return <div className={styles.item}>
                    {button_follow}
                    <UserBlock
                        userName={el.name}
                        userPhoto={el.photo_path}
                        aboutUser={el.about_user}
                        style={{width: 44 + 'px', height: 44 + 'px'}}/>
                </div>
            }
        );
    }

    moreUsers(){
        let limit = 5;
        let new_offset = this.props.offset == 0 ? 15 : this.props.offset+limit ;
        this.props.setCurrentOffset(new_offset);
        let i = {
            userId: 1,
            offset: new_offset,
            limit: limit
        };

        axios.post("http://localhost:3001/api/suggestedPeople/", i )
            .then(res => {
                this.props.getUsers(res.data.user_list);
            })
            .catch(err => {
                console.log("error in request", err);
            });
    }

        render() {
        return (
        <div className={styles.middle}>
            <div className={styles.title}>
                Рекомендации
                <button onClick={ ()=> this.moreUsers()}> еще </button>
            </div>
            <div className={styles.items}>
                {this.SuggestedElements()}
            </div>
        </div>
    );
}
}

export default Suggested;
