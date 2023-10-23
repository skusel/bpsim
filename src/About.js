import Navbar from './components/Navbar/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container col-xl-6 col-l-9 col-12" style={{marginTop: "75px"}}>
        <h2>What are branches?</h2>
        <p className="about-spacing">
          Branches are found at decision points in code. For example, whenever 
          you hit an <code>if</code> statement in code, a branch occurs. The 
          branch will either be taken if the conditional statement is satisfied 
          or not taken if the conditional statement is not satisfied. Branches 
          are also used to determine when a loop should exit.
        </p>
        <h2>What is branch prediction?</h2>
        <p className="about-spacing">
          Branch prediction is the act of predicting if a branch will be taken 
          or not taken before the branch outcome is known. When a CPU receives 
          a branch instruction it does not know if it will be taken or not, so 
          it takes a guess. If it finds out later that its guess was wrong, 
          then it pays a misprediction penalty because it wasted cycles on the 
          speculatively executed instructions and needs to start over using the
          correct instructions. Generally speaking, the fewer mispredictions, 
          the better the branch predictor. However, branch predictor success 
          varies depending on the pattern of branch outcomes the predictor 
          encounters. Therefore, a good branch predictor will result in fewer 
          branch mispredictions on a variety of branch outcome patterns.
        </p>
        <h2>What branch predictors are available for simulation?</h2>
        <p className="about-spacing">
          The predictors available for simulation are relatively simple and 
          were chosen because they work within the constraints of this 
          simulator. They are...
        </p>
        <ul>
          <li className="about-spacing">
            <strong>Not taken:</strong> A not taken predictor is one of the 
            simplest predictors. It predicts not taken every time.
          </li>
          <li className="about-spacing">
            <strong>Taken:</strong> A taken predictor does the opposite of the 
            not taken predictor. It predicts taken every time. 
          </li>
          <li className="about-spacing">
            <strong>One-bit:</strong> This predictor, also known as a 1-bit
            saturating counter, remembers the last branch outcome and uses it 
            to predict the next branch outcome. This information is stored in 
            a single bit. In this simulator, one-bit predictors always start 
            by assuming the last branch was not taken.
          </li>
          <li className="about-spacing">
            <strong>Two-bit:</strong> This predictor, also known as a 2-bit 
            saturating counter, has four states: (1) strongly not taken, (2) 
            weakly not taken, (3) weakly taken, and (4) strongly taken. When a 
            branch is not taken, it will move one state towards the strongly 
            not taken state unless it is already in the strongly not taken 
            state. For example, if it is in the strongly taken state and it 
            sees the actual branch outcome was not taken, it will move to the 
            weakly taken state. Similarly, when a branch is taken, it will 
            move one state towards the strongly taken state unless it is 
            already in the strongly taken state. When making a prediction, if 
            the 2-bit branch predictor is in a strongly not taken or weakly 
            not taken state, it will predict not taken, and if it is in a 
            strongly taken or weakly taken state, it will predict taken. In 
            this simulator, the 2-bit predictor always starts in the strongly 
            not taken state.
          </li>
          <li className="about-spacing">
            <strong>Two-level:</strong> You can set up to 10-bits of history 
            when using the one-bit and two-bit predictors. When you use N 
            history bits, the last N branch outcomes will be stored in an 
            integer. Not taken branches are represented with zeros and taken 
            branches are represented with ones. This integer is then used to 
            index into an array of one-bit or two-bit predictors that 
            ultimately predict the outcome of the next branch. The history
            integer used to index into the array is the first-level of the 
            predictor, and the one or two-bit predictor at that index is the 
            second-level.
          </li>
        </ul>
        <h2>How does this simulator work?</h2>
        <p className="about-spacing">
          First, select your branch predictor. Then, create the pattern you 
          would like to test it on. You can think of the pattern as the actual 
          branch outcomes. The predictor does not know the actual outcome of 
          the next branch, but the one-bit, two-bit, and two-level predictors 
          will use past outcomes from the pattern to predict the next outcome. 
          When you press "Predict", the simulator will run the branch 
          predictor on the pattern you created and report the efficacy of the 
          predictor on that pattern.
        </p>
        <h2>Why was this app created?</h2>
        <p className="about-spacing">
          <a href="https://github.com/skusel/bpsim">This app</a> was created 
          as a foray into web development. I wanted to design a web app that I 
          had not seen yet, and I think branch prediction is an interesting 
          topic. This project joins those two interests into the app you see 
          here.
        </p>
        <h2>Bibliography</h2>
        <ul>
          <li className="about-spacing-cite">
            Wikipedia. (n.d.). <i><a href="https://en.wikipedia.org/wiki/Branch_predictor">Branch predictor</a></i>.
          </li>
        </ul>
      </div>
    </>
  );
}
