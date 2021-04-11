import Vue from "vue";
import Vuex from "vuex";
import {getAccessToken, setAccessToken} from "@/utils/accessToken";
import {
  addCourse,
  addTeacher,
  allCourses,
  allTeacher,
  changeAddress,
  changePwd,
  changeTeacherAddress,
  changeTeacherBank,
  getAllClasses,
  getAllClasses2,
  getAllColleges,
  getAllCourseNames,
  getAllFroms,
  getAllGrades,
  getAllMajors,
  getAllOffice,
  getAllStudents,
  getAverageGrade,
  getAwards,
  getClassList,
  getCourses,
  getCredits,
  getGradeInfo,
  getOnlyBySno,
  getStudentDetail,
  getStudentMain,
  getStudentProfile,
  getStudentsByInfo,
  getTeacher,
  getTeacherProfile,
  insertStudent,
  login,
  printClassGrade,
  setCourses,
  setGrade,
  setGrades,
  setStudents,
  setTeachers,
  udpCourse,
  udpStudent,
  udpTeacher
} from "@/api/user";
import {messageDuration} from "@/config/settings";
import {Message} from "element-ui"

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    accessToken: getAccessToken(),
    username: 'admin',
    avatar: "",
    permissions: [],
    power: 0,
  },
  getters:{
    accessToken: (state) => state.accessToken,
    username: (state) => state.username,
    avatar: (state) => state.avatar,
    permissions: (state) => state.permissions,
    power: (state) => state.power
  },
  mutations:{
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
      setAccessToken(accessToken);
    },
    setUserName(state, username) {
      state.username = username;
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
    },
    setPower(state, power){
      state.power = power;
    }
  },
  actions:{
    async login({ commit, state }, userInfo) {
      console.log(userInfo)
      const {data}  = await login(userInfo);
      console.log(data);
      console.log(data.uname);
      if(data!=null){
        commit('setUserName', data.uname)
        commit('setPower', data.power);
        showMsg('欢迎登录', 'success' );
      }
      else{
        showMsg(
            '登录接口异常，未正确返回${tokenName}...',
            "error"
        );
      }
    },
    async setGrades({commit, state}, data){
      return setGrades(data);
    },
    async setStudents({commit, state}, data){
      return setStudents(data);
    },
    async setTeachers({commit, state}, data){
      return setTeachers(data);
    },
    async setCourses({commit, state}, data){
      return setCourses(data);
    },
    async getStudentInfo({commit, state}){
      return getStudentMain({username: state.username});
    },
    async getProfile({commit, state}) {
      let {data} = await getStudentProfile({username: state.username});
      //console.log(data);
      return data;
    },
    async printClassGrade({commit, state}, data){
      return printClassGrade(data);
    },
    async changePwd({commit, state}, data){
      let newdata = {username: state.username ,old: data.oldpassword, new: data.newpassword};
      //console.log(newdata);
      let res = await changePwd(newdata);
      return res;
    },
    async changeStuAddress({commit, state}, data){
      let newdata = {username: state.username, post: data.postCode, address: data.address}
      let res = await changeAddress(newdata);
      return res;
    },
    async getAwards({commit, state}){
        let data = {username: state.username};
        let res = await getAwards(data);
        return res;
    },
    async getCourses({commit, state}){
      let data = {username: state.username};
      let res = await getCourses(data);
      return res;
    },
    async getCredits({commit, state}){
      let data = {username: state.username};
      let res = await getCredits(data);
      return res;
    },
    async getAllGrades({commit, state}){
      let data = {username: state.username};
      let res = await getAllGrades(data);
      return res;
    },
    async logout({ commit }) {
      commit('setUserName', '');
      commit('setPower', 0)
    },
    async getTeaProfile({commit, state}){
      let data = await getTeacherProfile({username: state.username});
      return data;
    },
    async changeTeaAddress({commit, state}, data){
      let newdata = {username: state.username, post: data.postCode, address: data.address}
      let res = await changeTeacherAddress(newdata);
      return res;
    },
    async changeTeaBank({commit, state}, data){
      let newdata = {username: state.username, bank: data.bank, bankcard: data.bankcard}
      let res = await changeTeacherBank(newdata);
      return res;
    },
    async getOnlyCourse({commit, state}, data){
      let newdata = {sno: data}
      let res = await getOnlyBySno(newdata);
      return res;
    },
    async setGrade({commit, state}, data){
      let res = await setGrade(data);
      return res;
    },
    async getGradeInfo({commit, state}, data){
      let newdata = {username: state.username, classname: data.classname, sno: data.sno, sname: data.sname};
      return getGradeInfo(newdata);
    },
    async getAverageGrade({commit, state}){
      return getAverageGrade();
    },
    async getClassList({commit, state}){
      let newdata = {username: state.username};
      let res = await getClassList(newdata);
      return res;
    },
    async getStudentDetail({commit, state}, data){
      let newdata = {sno: data.sno}
      let res = await getStudentDetail(newdata);
      return res;
    },
    async getAllStudents({commit, state}){
      let newdata = {username: state.username};
      let res = await getAllStudents(newdata);
      return res;
    },

    async getAllColleges({commit, state}){
      let res = await getAllColleges();
      return res;
    },
    async getAllMajorsByCollege({commit, state}, data){
      let newdata = {college: data}
      console.log(newdata);
      let res = await getAllMajors(newdata);
      return res;
    },
    async getAllClassesByMajor({commit, state}, data){
      let newdata = {major: data}
      let res = await getAllClasses(newdata);
      return res;
    },
    async getAllFroms({commit, state}){
      let res = await getAllFroms();
      return res;
    },
    async udpStudent({commit, state}, data){
      let res = await udpStudent(data);
      return res;
    },
    async getStudentByInfo({commit, state} , data){
      let res = await getStudentsByInfo(data);
      return res;
    },
    async insertStudent({commit, state}, data){
      let res = await insertStudent(data);
      return res;
    },
    async getAllOffice({commit, state}){
      let res = await getAllOffice();
      return res;
    },
    async addTeacher({commit, state} , data){
      let res = await addTeacher(data);
      return res;
    },
    async allTeacher({commit, state}){
      let res = await allTeacher();
      return res;
    },
    async udpTeacher({commit, state}, data){
      let res = await udpTeacher(data);
      return res;
    },
    async getTeacher({commit, state}, data){
      let res = await getTeacher(data);
      return res;
    },
    async allClasses({commit, state}){
      let res = await getAllClasses2();
      return res;
    },
    async allCourseName(commit, state){
      let res =  await getAllCourseNames();
      return res;
    },
    async addCourse({commit, state}, data){
      let res = await addCourse(data);
      return res;
    },
    async allCourses({commit, state}, data){
      let res = await allCourses(data);
      return res;
    },
    async udpCourse({commit, state} , data){
      let res = await udpCourse(data);
      return res;
    }

  }
});

let showMsg = (message, type)=>{
  return Message({
    message: message,
    type: type,
    duration: messageDuration,
  });
}

export default store;
