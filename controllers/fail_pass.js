export function render_fail_pass(data) {
    const grades = data.data.progress.map(p => p.grade);
    const pass = grades.filter(g => g === 1).length;
    const fail = grades.filter(g => g === 0).length;
    console.log("the fail pass", fail, "pass: ", pass);
}