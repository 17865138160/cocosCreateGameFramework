
/*
 * @Author: dgflash
 * @Date: 2021-11-18 17:47:56
 * @LastEditors: dgflash
 * @LastEditTime: 2022-01-27 11:16:08
 */
import { Node, Vec3 } from "cc";
import { ecs } from "../../core/libs/ECS";
import { ViewUtil } from "../../core/utils/ViewUtil";
import { MoveToComp } from "../common/ecs/position/MoveTo";
import { RoleChangeJobComp } from "./bll/RoleChangeJob";
import { RoleBaseModelComp } from "./model/RoleBaseModelComp";
import { RoleJobModelComp } from "./model/RoleJobModelComp";
import { RoleModelComp } from "./model/RoleModelComp";
import { RoleViewComp } from "./view/RoleViewComp";

export class RoleEntity extends ecs.Entity {
    RoleModel!: RoleModelComp;
    RoleBaseModel!: RoleBaseModelComp;
    RoleJobModel!: RoleJobModelComp;
    RoleView!: RoleViewComp;

    RoleChangeJob!: RoleChangeJobComp;
}

/** 
 * 角色实体 
 * 需求
 * 1、角色基础属性的数据结构（唯一标识、名字、等级、经验等）
 * 2、角色基础属性信息（力量、敏捷、生命等）
 * 3、角色职业信息（职业名、职业属性附加属性）
 * 4、角色需要有一个动画模型
 * 5、与玩家互动的玩法（升级、转职、攻击等）
 */
export class Role {
    entity: RoleEntity = null!;

    constructor() {
        this.entity = ecs.createEntityWithComps(
            RoleModelComp,
            RoleBaseModelComp,
            RoleJobModelComp);

        this.entity.get(RoleModelComp).facade = this;
    }

    /** 加载角色显示对象 */
    load(): Node {
        var node = ViewUtil.createPrefabNode("game/battle/role");
        var mv = node.getComponent(RoleViewComp)!;
        this.entity.add(mv);
        mv.load();
        return node;
    }

    move(target: Vec3) {
        var move = this.entity.add(MoveToComp);
        move.target = target;
        move.node = this.entity.RoleView.node;
        move.speed = 100;
    }

    /** 攻击 */
    attack(target: Role) {
        // 战斗流程
    }

    /** 转职 */
    changeJob(jobId: number) {
        var rcj = this.entity.add(RoleChangeJobComp);
        rcj.jobId = jobId;
    }

    /** 角色升级 */
    upgrade() {

    }

    destroy() {
        this.entity.destroy();
    }
}